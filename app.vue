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
    <Body class="bg-cover">
      <div class="flex flex-col min-h-screen">
        <SiteHeader />
        <main class="mx-auto sm:px-6 lg:px-8 grow items-start w-full max-w-5xl">
          <NuxtPage />
        </main>
        <SiteFooter />
      </div>
    </Body>
  </Html>
</template>

<style>
body {
  /** The background image is provided by loading.io */
  background-image: url("/assets/clouds.svg");
}
</style>
