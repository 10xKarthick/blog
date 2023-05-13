<template>
    <div class="w-full flex items-center justify-center mx-auto">
      <div class="w-full md:w-2/3">
        <div class="flex flex-col items-center justify-center mt-8 sm:flex-row">
          <img src="./assets/images/abstract-profile.jpeg" alt="Portrait of Karthick Soundarrajan" class="rounded-full w-40 lg:w-52"
            width="100%" height="100%" />
          <div class="flex flex-col h-full sm:ml-12">
            <h1 class="mt-6 text-3xl font-semibold lg:text-4xl text-center sm:text-left clip">Karthick Soundarrajan</h1>
            <p class="my-1 font-medium max-w-xs text-gray-500 mx-3 sm:mx-0 text-center sm:text-left">
              is an aspiring Solution Architect, enjoying all the little moments in life.
            </p>
          </div>
        </div>
  
        <div class="mt-5 mx-5 sm:mx-5 border-b border-gray-300"></div>
  
        <div class="mx-5 sm:mx-0 flex flex-col">
          <p class="mt-6 text-gray-500 text-justify sm:mx-5">
            As a skilled software engineer, I understand the importance of connecting with clients and businesses to provide
            the most effective solutions. My background includes a Master of Science (MSc) degree in Web and Cloud Computing
            from Sheffield Hallam University, equipping me with the expertise to tackle various projects. My experience in
            programming languages and frameworks, such as C#.NET, ASP.NET, MS-SQL, DOTNET, MVC, and MVVM, allows me to
            create tailored solutions that cater to your unique business requirements. I also have a solid grasp of the
            Software Development Life Cycle (SDLC), ensuring the development of reliable and efficient software
            applications.
          </p>
          <p class="mt-6 text-gray-500 text-justify sm:mx-5">
            I have an insatiable appetite to learn more. With exciting fields
            such as machine learning, AI, automated vehicles, data analytics,
            cybersecurity, and more becoming relevant and inviting, I hope to
            acquire as much knowledge as possible and apply what I know to an area
            I love and believe in making the world a better place.
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup></script>
  <style scoped>
  .shareCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 15px;
    text-align: center;
  }
  
  .title {
    display: flex;
    align-items: center;
    font-size: 2.2em;
    font-weight: bold;
  }
  
  .description {
    margin: 1em 0;
  }
  </style>
  `