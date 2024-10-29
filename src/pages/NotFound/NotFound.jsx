import styles from './NotFound.module.scss'

import Logotype from '../../assets/images/logotype.svg';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className={styles.container}>
      <section className={styles.splash}>
        <h1>404</h1>
        <img src={Logotype} alt="A cute owl" />
        <Link className='btn' to="/">Back to home</Link>
      </section>
    </main>
  )
}

export default NotFound
