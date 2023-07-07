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
    <Body class="bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">
      <div class="flex flex-col min-h-screen">
        <SiteHeader />
        <main
          class="mx-auto sm:px-6 lg:px-8 grow items-start w-full max-w-5xl"
        >
          <NuxtPage />
        </main>
        <SiteFooter />
      </div>
    </Body>
  </Html>
</template>
