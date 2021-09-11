// @ts-nocheck
import styles from 'styles/Search.module.scss'

// Components
import PageBase from "components/pageBase";
import { InputFieldNonManaged } from 'components/ui/inputField';
import { Subtitle } from 'components/subtitle';
import { useState } from 'react';
import { DesktopOverlay, MobileOverlay } from 'components/overlayMenu';

import Head from 'next/head'
import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion';
import React from 'react';

const BookCard = dynamic(() => import("components/cards/bookCard"))

export default function Search() {
    const [filterMenu, setFilterMenu] = useState(false);

    return (
        <>
            <Head>
                <title>Search · Novel Tracker</title>
            </Head>

            <PageBase>
                <div className={`${styles.inputWrap} flex`}>
                    <InputFieldNonManaged placeHolder="Search..." />
                    <a onClick={() => setFilterMenu(prev => !prev)} className={"fontLarge"} ><i className='bx bx-filter' /></a>

                    <AnimatePresence>
                        {filterMenu &&
                            <DesktopOverlay title="Filter Results" className={styles.filterOverlay}>
                                <InputFieldNonManaged title="Publishing Status" />
                                <InputFieldNonManaged title="Genre" />
                                <InputFieldNonManaged title="Year" />
                            </DesktopOverlay>
                        }
                    </AnimatePresence>
                </div>
                <Subtitle text="Results" />
                <div className={`${styles.results} flex flextRight`}>
                    <BookCard />
                    <BookCard />
                    <BookCard />
                    <BookCard />
                    <BookCard />
                    <BookCard />
                    <BookCard />
                    <BookCard />
                    <BookCard />
                    <BookCard />
                    <BookCard />
                    <BookCard />
                    <BookCard />
                </div>

                <AnimatePresence>
                    {filterMenu &&
                        <MobileOverlay title={"Filter Results"} onOutSideClick={() => setFilterMenu(false)} >
                            <InputFieldNonManaged placeHolder="Publishing Status" />
                            <InputFieldNonManaged placeHolder="Genre" />
                            <InputFieldNonManaged placeHolder="Year" />
                        </MobileOverlay>
                    }
                </AnimatePresence>

            </PageBase >
        </>
    )
}