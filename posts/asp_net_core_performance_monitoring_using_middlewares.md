---
title: Asp.Net Core Performance Monitoring using Middlewares
description: Discover how to create a performance monitoring middleware in ASP.NET Core in our latest blog post! We delve into the steps of building a middleware, integrating it with your pipeline, and using it to monitor two different APIs—one fast and one intentionally slow. Equip yourself with this essential tool for your .NET toolbox!
tags: 
    - Asp.Net Core
    - Performance
    - Middleware
date: 2023-05-29
---

# ASP.NET Core Performance Monitoring using Middlware

> Today, we're stepping into the realm of ASP<span>.NET</span> Core to explore a fundamental aspect of web development - performance monitoring. Specifically, we'll learn how to create a custom middleware to monitor and log the execution time of our HTTP requests. 
>
> By the end of this blog post, you'll have a new tool in your .NET toolbox - a performance monitoring middleware.

<br />
<iframe
    width="800"
    height="400"
    src="https://www.youtube.com/embed/_wzBvlpdQIE"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen
    style="text-align: center;"
></iframe>

## Creating the Middleware

First things first, we need to create our middleware. The middleware will start a timer before the request, let the request proceed, and then stop the timer after the request. The total time taken is logged to the console.

Here is a simple example of such middleware:

```csharp
public class PerformanceMonitoringMiddleware
{
    private readonly ILogger<PerformanceMonitoringMiddleware> _logger;
    private Stopwatch _timer;

    public PerformanceMonitoringMiddleware(ILogger<PerformanceMonitoringMiddleware> logger)
    {
        _logger = logger;
    }

    public async Task Invoke(HttpContext httpContext, RequestDelegate next)
    {
        _timer = new Stopwatch();
        _timer.Start();

        await _next(httpContext);

        _timer.Stop();

        var timeTaken = _timer.ElapsedMilliseconds;

        _logger.LogInformation($"Request to {httpContext.Request.Path} took {timeTaken}ms");
    }
}
```

## Integrating Middleware into the Pipeline

Once we have our middleware ready, we need to include it in our middleware pipeline. This is done in the **Startup.cs** file, specifically in the **Configure** method, or in the **Program.cs** based on your version of asp.net core.

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }
    else
    {
        app.UseExceptionHandler("/Home/Error");
        app.UseHsts();
    }

    app.UseHttpsRedirection();
    app.UseStaticFiles();

    app.UseRouting();

    app.UseAuthorization();
    
    // Add the performance monitoring middleware here
    app.UseMiddleware<PerformanceMonitoringMiddleware>();
    
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}");
    });
}
```

## Testing Our Middleware with Two APIs

Now, let's put our middleware to the test. For this, we'll create two APIs: one that is a regular, fast API, and another one that intentionally blocks the thread for 3000 milliseconds.

```csharp
[Route("[controller]")]
[ApiController]
public class DemoController : ControllerBase
{
    [HttpGet]
    [Route("FastApi")]
    public IActionResult Get()
    {
        return Ok("Hello from FastApi");
    }

    [HttpGet]
    [Route("SlowApi")]
    public async Task<IActionResult> GetSlowAsync()
    {
        await Task.Delay(3000);
        return Ok("Hello from SlowApi"); 
    }
}
```

Now, if we run our application and make requests to these APIs, we can monitor their performance right from our console.

[Here is the github link to the source code](https://github.com/10xKarthick/Perf-Monitor-Middleware-Demo)

## Conclusion

And voila! You now have a basic performance monitoring tool for your ASP.NET Core application. This tool can be incredibly valuable during development, especially when you're trying to identify performance issues.

Remember, while this method serves as a good starting point, there are much more advanced tools and techniques available for production-level performance monitoring. But every journey begins with a single step, and you just took a significant one.

Happy coding, and until next time!