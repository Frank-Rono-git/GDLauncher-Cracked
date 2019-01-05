import React, { useState, useEffect } from 'react';
import ContentLoader from 'react-content-loader';
import axios from 'axios';
import Modal from '../Common/Modal/Modal';
import { CURSEMETA_API_URL } from '../../constants';
import styles from './CurseModpackExplorerModal.scss';

const Loader = () => <ContentLoader
  height="100%"
  width="100%"
  speed={0.6}
  primaryColor="var(--secondary-color-2)"
  secondaryColor="var(--secondary-color-3)"
  style={{
    height: '100%',
    width: '100%'
  }}
>
  <rect x="35%" y="40" rx="0" ry="0" width="55%" height="40" />
  {[...Array(10).map((v, i) => <rect x="15%" y={40 * i} rx="0" ry="0" width="75%" height="20" />)]}
</ContentLoader>;

export default props => {
  const { addonID } = props.match.params;
  const [unMount, setUnMount] = useState(false);
  const [packData, setPackData] = useState(null);

  useEffect(async () => {
    const { data } = await axios.get(`${CURSEMETA_API_URL}/direct/addon/${addonID}`);
    setPackData(data);
  }, []);

  return (
    <Modal
      history={props.history}
      unMount={unMount}
      title="Modpack Explorer"
      style={{ height: '80vh', width: '80vw', left: '10%' }}
    >
      {packData !== null ? <div className={styles.container}>
        <h1>{packData.name}</h1>
        <span
          dangerouslySetInnerHTML={{
            __html: packData.fullDescription
          }}
        />
      </div> : <Loader />}
    </Modal>
  )
};