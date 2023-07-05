<script setup></script>

<template>
  <Html lang="en" dir="ltr">
    <Head>
      <Title>Weather app</Title>
      <Link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Link>
    </Head>
    <Body class="bg-weather-secondary">
      <div class="flex flex-col min-h-screen">
        <SiteHeader />
        <main
          class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 grow items-start w-full"
        >
          <NuxtPage />
        </main>
        <!-- <SiteFooter /> -->
      </div>
    </Body>
  </Html>
</template>
