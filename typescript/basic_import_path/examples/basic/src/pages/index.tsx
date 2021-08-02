import Runner from 'my_package'
import styles from './index.less'

export default function IndexPage() {
    Runner()
    return (
        <div>
            <h1 className={styles.title}>Page index</h1>
        </div>
    )
}
