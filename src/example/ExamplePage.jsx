import { Container } from '@openedx/paragon';
import { Suspense, lazy } from 'react';

function loadRemoteComponent(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = src;
    script.onload = () => {
      resolve({ default: global.ChildPage });
    };
    script.onerror = () => {
      reject(new Error('Script loading error.'));
    };
    document.head.appendChild(script);
  });
}

const ExamplePage = () => {
  const ChildPage = lazy(() => loadRemoteComponent('http://localhost:8081/child.js'));

  return (
    <main>
      <Container className="py-5">
        <h1>I am the parent page.</h1>
        <p>Hello, I am a parent!</p>
        <Suspense fallback="Loading...">
          <ChildPage />
        </Suspense>
      </Container>
    </main>
  );
};
export default ExamplePage;
