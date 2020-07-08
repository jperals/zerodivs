<template>
  <dl>
    <dt>What is this?</dt>
    <dd>This is an experimental UI editor for creating illustrations based applying styles (CSS) on a single HTML element.</dd>
    <dt>Why did you do it?</dt>
    <dd>
      <p>
        <em>Short answer:</em>
      </p>
      <p>Experimentation and fun.</p>
      <p>
        <em>Long answer:</em>
      </p>
      <p>As a web developer I like to learn ways to avoid unnecessary markup (and scripts). Often CSS knowledge helps create elegant and robust solutions and is an often underrated resource.</p>
      <p>This does not mean that one should avoid markup and force CSS-based solutions at all costs, the point is just to explore what a medium can do.</p>
      <p>Some resources about the topic that I found interesting include:</p>
      <ul>
        <li>
          Lea Verou's book
          <em>
            <a href="https://www.oreilly.com/library/view/css-secrets/9781449372736/">CSS Secrets</a>
          </em>
        </li>
        <li>
          Chris Coyier's article
          <em>
            <a href="https://css-tricks.com/the-shapes-of-css/">The Shapes of CSS</a>
          </em>
        </li>
        <li>
          Lynn Fisher's
          <a href="https://a.singlediv.com">Single Div Illustrations</a>
        </li>
      </ul>
    </dd>
    <dt>How did you do it?</dt>
    <dd>
      You can find the code
      <a href="https://github.com/jperals/zerodivs">here</a>.
    </dd>
    <dt>Is my work being saved?</dt>
    <dd>Only to your browser via <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">localStorage</a>. In order to share your illustrations, you can export them to <a href="https://codepen.io/">CodePen</a>.</dd>
    <dt>Why the name "Zero Divs"?</dt>
    <dd>
      <p>
        This might not be super relevant, but I noticed that it's not even necessary to have a "div" or similar HTML node, since the styles can be applied directly to the body of a page.
        So it is possible to display complex visuals on a page that, from the content perspective, is completely empty.
      </p>
      <p>If you make use of the "Export to CodePen" button, you'll see that the generated pen has no markup at all (nor JavaScript, of course) --only CSS.</p>
      <p>And because I just couldn't come up with a better name, that's it.</p>
    </dd>
    <dt>Who are you?</dt>
    <dd>
      I am
      <a href="https://perals.io">Joan</a>, a UX Engineer from Catalonia living in Berlin.
    </dd>
  </dl>
</template>

<style scoped>
dl {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem 2rem;
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