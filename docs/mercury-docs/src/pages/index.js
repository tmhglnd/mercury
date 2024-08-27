import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title" style={{fontSize: "3.5em", fontWeight: "bolder", color: "white"}}>
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle" style={{fontSize: "2em", color: "white"}}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="https://mercury.timohoogland.com">
            Start Coding
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            className="button button--secondary button--lg"
            to="/docs/welcome">
            Read Documentation
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Docs`}
      description="Documentation and Tutorials for the Mercury Live Coding Environment">
      <HomepageHeader />
      <main>
        {/* <HomepageFeatures /> */}
      </main>
    </Layout>
  );
}
