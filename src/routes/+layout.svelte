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

<footer class="footer items-center p-4 bg-neutral text-neutral-content">
  <aside class="items-center grid-flow-col">
    <p>Copyright © 2023 - <a href="https://willin.wang">Willin Wang</a> All right reserved</p>
  </aside>
</footer>

{#if true}
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5059418763237956"
    crossorigin="anonymous"></script>
{/if}
