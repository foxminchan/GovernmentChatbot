import React from 'react';
import Link from '@docusaurus/Link';
import styles from './style.module.css';
import SectionLayout from '../SectionLayout';

interface TechItem {
  url: string;
  logo: string;
}

const TechList: TechItem[] = [
  {
    url: 'https://react.dev/',
    logo: require('../../../static/img/tech/reactjs.png').default,
  },
  {
    url: 'https://nestjs.com/',
    logo: require('../../../static/img/tech/nest.png').default,
  },
  {
    url: 'https://js.langchain.com/',
    logo: require('../../../static/img/tech/langhchain.png').default,
  },
  {
    url: 'https://openai.com/',
    logo: require('../../../static/img/tech/open-ai.png').default,
  },
];

const TechSection: React.FC = () => {
  return (
    <SectionLayout
      title="Powered by"
      style={{ backgroundColor: 'white' }}
      titleStyle={{ color: '#444950' }}
    >
      <div
        className="row"
        style={{
          justifyContent: 'center',
          gap: '5px',
        }}
      >
        {TechList.map(({ url, logo }, idx) => (
          <div className="col col--2" key={idx}>
            <div className="col-demo text--center">
              <div className={styles.colDemoItems}>
                <Link href={url}>
                  <img
                    loading="lazy"
                    src={logo}
                    style={{ width: '100px' }}
                    alt={`Tech ${idx}`}
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
};

export default TechSection;
