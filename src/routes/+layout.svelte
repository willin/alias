<script>
  import '../app.css';
  // import { t } from '@svelte-dev/i18n';
  import Navbar from '$components/Navbar.svelte';
  import { onNavigate } from '$app/navigation';

  onNavigate((navigation) => {
    // @ts-ignore
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      // @ts-ignore
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<div id="background"></div>
<Navbar />

<main
  class="w-[720px] max-w-full mx-auto shadow bg-neutral/90 text-neutral-content p-2 sm:p-4 mb-20">
  <slot />
</main>

<footer class="text-center text-sm mt-4">
  <p>
    <a
      href="https://github.com/willin"
      target="_blank"
      class="inline-block"
      rel="noreferrer">
      <img
        src="https://img.shields.io/github/followers/willin.svg?style=social&amp;label=Followers"
        alt="Github Followers" />
    </a>{' '}
    <a
      href="https://github.com/willin/alias"
      target="_blank"
      class="inline-block"
      rel="noreferrer">
      <img
        alt="GitHub Repo stars"
        src="https://img.shields.io/github/stars/willin/alias?style=social" />
    </a>
  </p>
  <p>
    &copy;{' '}
    <a href="https://willin.wang" target="_blank" rel="noreferrer">
      Willin Wang
    </a>
  </p>
</footer>
{#if true}
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5059418763237956"
    crossorigin="anonymous"></script>
{/if}
