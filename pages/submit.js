import styles from 'styles/SubmitPage.module.scss'

// Components
import Head from 'next/head'

import PageBase from 'components/pageBase';
import { InputField, OptionSelect } from 'components/ui/inputField';
import { Subtitle } from 'components/header';
import { NavigationButton } from "components/ui/button";

export default function SubmitPage({ data }) {

    data = {
        title: "Honzuki no Gekokujou: Shisho ni Naru Tame ni wa Shudan wo Erandeiraremasen Dai 1-bu - Heishi no Musume",
        image: "https://dummyimage.com/200x300/000000/ffffff&text=image+will+appear+here"
    }

    return (
        <>
            <Head>
                <title>Submit · Novel Tracker</title>
            </Head>

            <PageBase>
                <section className={styles.section}>
                    <Subtitle text="Titles" />

                    <div className={styles.sectionContainer}>
                        <InputField title="Native" />
                        <InputField title="Romanized" />
                        <InputField toolTip="Licensed only! Fan translated titles are NOT allowed." title="English" />
                    </div>
                </section>

                <section className={styles.section}>
                    <Subtitle text="Description" />
                    <div className={styles.sectionContainer}>
                        <textarea rows={15} wrap="soft" />
                    </div>
                </section>

                <section className={styles.section}>
                    <Subtitle text="Other" />
                    <div className={styles.sectionContainer}>
                        <div className="flex">
                            <InputField title="Author Name" />
                            {/* <InputField title="Status" placeHolder="TODO: option select" /> */}
                            <OptionSelect
                                title="Release Status"
                                options={['Finished', 'Releasing', 'Cancelled', 'Hiatus', 'Coming Soon']}
                            />                        </div>
                        <div className="flex">
                            <InputField title="Start Date" inputType="date" />
                            <InputField title="End Date" inputType="date" />
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <Subtitle text="Volumes (5)" />
                    <ul className={`${styles.sectionContainer} ${styles.volumeList} flex`}>
                        <VolumeItem data={data} />
                        <VolumeItem data={data} />
                        <VolumeItem data={data} />
                        <VolumeItem data={data} />
                        <VolumeItem data={data} />
                        <div>
                            <a title="New Volume" className={`${styles.volumeItem} ${styles.placeholder} flex flexAround`}>
                                <i className="bx bx-plus bx-md" />
                            </a>
                            <div className="skeleton skeletonText" />
                            <div className="skeleton skeletonText" />
                            <div className="skeleton skeletonText" />
                            <div className="skeleton skeletonText" />
                            <div className="skeleton skeletonText" />
                            <div className="skeleton skeletonText" />
                            <div className="skeleton skeletonText" />
                            <div className="skeleton skeletonText" />
                        </div>
                    </ul>
                </section>
                <NavigationButton text="Submit Book" icon="bx bx-subdirectory-left bx-sm" />
            </PageBase>
        </>
    )
}

function VolumeItem({ data }) {
    return (
        <li className={styles.volumeItem}>
            <div className={`flex flexColumn ${styles.book}`}>
                <img className="skeleton" width={200} height={300} src={data.image} />
                <div className={`${styles.volumeDetails}`}>
                    <InputField placeHolder="Image URL" inputType="url" />
                    {/* <InputField placeHolder="Volume" inputType="number" maxValue="99" /> */}
                    <InputField placeHolder="Chapters" inputType="number" maxValue="999" />
                </div>
            </div>
        </li>
    )
}