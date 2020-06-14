<template>
  <dl>
    <dt>What is this?</dt>
    <dd>This is an experimental UI editor for creating illustrations based applying styles (CSS) on a single HTML element.</dd>
    <dt>Why did you do it?</dt>
    <dd>
      As a web developer I appreciate elegant CSS-based solutions that allow keeping the HTML code clean with a minimal amount of semantic markup.
      This doesn't mean that going all the way towards CSS-only is a good idea, but yet I wanted to explore how far it is possible to go this way.
      An important source of inspiration were Lynn Fisher's <a href="https://a.singlediv.com">Single Div Illustrations</a>.
    </dd>
    <dt>How did you do it?</dt>
    <dd>
      You can find the code
      <a href="https://github.com/jperals/deepdiv">here</a>.
    </dd>
    <dt>Who are you?</dt>
    <dd>
      I am
      <a href="https://perals.io">Joan</a>, a Web and UX developer from Catalonia living in Berlin.
    </dd>
  </dl>
</template>

<style scoped>
dl {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  line-height: 1.5;
}
dt {
  font-weight: bold;
  margin: 2rem 0 0.5rem;
}
dd {
  margin-left: 0;
}
</style>