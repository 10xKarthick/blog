---
title: "Building Stateful Serverless Applications with Azure Durable Functions"
description: Ever wish you could have a calculator that could remember its previous state even if it was turned off? With Azure Durable Functions, you can create something just like that! In this post, we'll learn how to build a counter that not only can increase or decrease its count but also remembers its state even if our application restarts.

tags:
    - Azure Durable Functions
    - Serverless Computing
    - Azure Functions
    - State Management
    - Cloud Computing
    - Stateful Applications
    - Azure
     -Microsoft Azure
    - .NET
    - C#

date: 2023-06-12
---

## Building Stateful Serverless Applications with Azure Durable Functions

> Ever wish you could have a calculator that could remember its previous state even if it was turned off? With Azure Durable Functions, you can create something just like that! In this post, we'll learn how to build a counter that not only can increase or decrease its count but also remembers its state even if our application restarts.

### An Introduction to Azure Durable Functions

Azure Durable Functions, an extension of Azure Functions, provide a framework for writing stateful functions in a serverless compute environment. They provide built-in capabilities for managing state, handling long-running operations, and dealing with intermittent failures.

In this post, we'll explore how to build a stateful counter application using Azure Durable Functions. This counter can be incremented by a certain number through HTTP requests and will maintain its state even after a function app restart.

### Architectural Patterns in Azure Durable Functions

Before we plunge into our counter example, it's pertinent to mention that Azure Durable Functions accommodate several patterns for designing reliable, scalable applications. Some key patterns include:

- **Function Chaining**: It involves the sequential execution of functions in a determined order, where one function's output is the next one's input. [Learn more about Function Chaining](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview#chaining).

- **Fan-Out/Fan-In**: This pattern is useful when you have to run multiple functions simultaneously and then consolidate the results. [Learn more about Fan-Out/Fan-In](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview#fan-out-fan-in).

- **Asynchronous HTTP APIs**: This pattern comes in handy when you have to implement protracted operations as HTTP APIs. [Learn more about Asynchronous HTTP APIs](https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview?tabs=csharp-inproc#async-http).

- **Monitoring**: This pattern enables you to run a function on a schedule in a serverless setting. [Learn more about Monitoring](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview#monitoring).

- **Human Interactions**: This pattern is employed when you need to pause for human input or approval in a workflow. [Learn more about Human Interactions](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview#human).

- **Aggregator**: This pattern is used when you need to gather data from multiple sources. [Learn more about Aggregator](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview#aggregator).

### Constructing the Counter Function

The crux of our application is the `Counter` function. This function awaits commands to either increment or reset the count, and always retains the current count, even after app restarts.

```csharp
[FunctionName("Counter")]
public static void Counter([EntityTrigger] IDurableEntityContext ctx)
{
    int currentValue = ctx.GetState<int>();

    switch (ctx.OperationName.ToLowerInvariant())
    {
        case "add":
            int amountToAdd = ctx.GetInput<int>();
            currentValue += amountToAdd;
            ctx.SetState(currentValue);
            break;
        case "reset":
            ctx.SetState(0);
            break;
        case "get":
            ctx.Return(currentValue);
            break;
    }
}
```

### Constructing the Client Functions

To facilitate interaction with our counter, we require a set of client functions. These functions are designed to fetch the current state of the counter, update the counter, and reset the counter respectively.

To fetch the current state of the counter, use the `UpdateCounter` function. It reads the state of the counter entity and returns the current value:

```csharp
[FunctionName("GetCounter")]
public static async Task<IActionResult> GetCounter(
    [HttpTrigger(AuthorizationLevel.Function, "get", Route = "counter/{id}")] HttpRequest req,
    [DurableClient] IDurableEntityClient client,
    string id)
{
    var entityId = new EntityId("Counter", id);
    var stateResponse = await client.ReadEntityStateAsync<int>(entityId);

    if (!stateResponse.EntityExists) return new NotFoundResult();

    var counterValue = stateResponse.EntityState;
    return new OkObjectResult(counterValue);
}
```

To increment the counter, we have the `UpdateCounter` function. This function signals the counter entity to add a specific amount to its current state:

```csharp
[FunctionName("UpdateCounter")]
public static async Task<IActionResult> UpdateCounter(
    [HttpTrigger(AuthorizationLevel.Function, "post", Route = "counter/{id}")] HttpRequest req,
    [DurableClient] IDurableEntityClient client,
    string id)
{
    var entityId = new EntityId("Counter", id);
    var amountToAdd = int.Parse(await new StreamReader(req.Body).ReadToEndAsync());
    await client.SignalEntityAsync(entityId, "add", amountToAdd);
    return new OkResult();
}
```

And finally, to reset the counter, we use the `ResetCounter` function. This function signals the counter entity to reset its state:

```csharp
[FunctionName("ResetCounter")]
public static async Task<IActionResult> ResetCounter(
    [HttpTrigger(AuthorizationLevel.Function, "post", Route = "counter/{id}/reset")] HttpRequest req,
    [DurableClient] IDurableEntityClient client,
    string id)
{
    var entityId = new EntityId("Counter", id);
    await client.SignalEntityAsync(entityId, "reset");
    return new OkResult();
}
```

With these client functions in place, we can directly interact with our counter via HTTP requests, providing a flexible interface for managing the counter state.

### Deploying and Evaluating the Function App

After creating our functions, we can deploy them to Azure and begin testing the counter. The counter can be accessed and manipulated through HTTP requests using the following endpoints:

- To fetch the current value of the counter, send a GET request to `http://localhost:7071/api/counter/{id}`, where `{id}` is the identifier of the counter.

- To update the counter by adding a specific amount, send a POST request to `http://localhost:7071/api/counter/{id}`, where `{id}` is the identifier of the counter. The amount to be added should be included in the request body.

- To reset the counter, send a POST request to `http://localhost:7071/api/counter/{id}/reset`, where `{id}` is the identifier of the counter.

Here's an example using cURL:

```bash
# Fetch the current value of the counter
curl -X GET http://localhost:7071/api/counter/{id}

# Update the counter by adding a specific amount
curl -X POST -d "10" http://localhost:7071/api/counter/{id}

# Reset the counter
curl -X POST http://localhost:7071/api/counter/{id}/reset
```

Remember to replace `{id}` with the actual identifier of the counter you want to access or modify. You can use any HTTP client or tool, such as cURL or Postman, to send these requests.

After each request, you will receive an HTTP response indicating the success of the operation. The counter will retain its state even after a function app restart, showcasing the statefulness of Durable Functions.

Now you can explore the capabilities of Azure Durable Functions and build stateful serverless applications with ease!

### Conclusion

Azure Durable Functions enable us to craft robust, stateful serverless applications capable of handling intricate tasks like state management, long-running operations, and dealing with sporadic failures. The example of a stateful counter lucidly showcases these concepts and demonstrates how Durable Functions preserve state across application restarts. With Durable Functions, the potential is boundless.