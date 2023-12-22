<script lang="ts">
  import { navigating } from '$app/stores';
  $: if ($navigating) {
    try {
      // @ts-ignore
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }
</script>

<ins
  class="adsbygoogle"
  style="display:block"
  data-ad-format="autorelaxed"
  data-ad-client="ca-pub-5059418763237956"
  data-ad-slot="3528738701"></ins>

{#if true}
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
{/if}
