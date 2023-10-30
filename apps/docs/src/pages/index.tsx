import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import WhatIs from '../components/WhatIsSection';
import TechSection from '../components/TechStackSection';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img
          loading="lazy"
          width="250px"
          height="250px"
          alt="government chatbot logo"
          className={styles.heroLogo}
          src={useBaseUrl('/img/logo.png')}
        />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
            style={{
              borderRadius: '25px',
              borderColor: '#426fcc',
              backgroundColor: '#426fcc',
              color: '#fff',
            }}
          >
            Get Started 🚀
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="This document hosts an innovative chatbot solution that intelligently manages and streamlines the process of resolving diverse administrative procedures. Powered by advanced language models, the chatbot ensures smooth navigation through complex tasks, ensuring an intuitive and user-friendly experience for all users."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <WhatIs />
        <TechSection />
      </main>
    </Layout>
  );
}
