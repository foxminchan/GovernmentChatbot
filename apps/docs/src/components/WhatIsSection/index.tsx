import React from 'react';
import Divider from '../Divider';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

const WhatIs = (): React.ReactElement => (
	<div className={styles.Boulder}>
  <section className={styles.whatIs}>
    <h1 className={styles['whatIs--title']}>What is Government Chatbot?</h1>
    <p className={styles['whatIs--p']}>
      Government Chatbot is an innovative chatbot solution that intelligently
      manages and streamlines the process of resolving diverse administrative
      procedures. Powered by advanced language models, the chatbot ensures
      smooth navigation through complex tasks, ensuring an intuitive and
      user-friendly experience for all users.
    </p>
    <Link
      to={'https://github.com/foxminchan/GovernmentChatbot'}
      className="link-primary"
    >
      Explore Github Repository
    </Link>
    <Divider />
		</section>
	</div>
);

export default WhatIs;
