import React from "react";
import { isMobile } from 'react-device-detect'
import MobileNotice from "./mobile-notice";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { GitHub } from "@/assets/github";
import { ChevronRight12Filled } from "@fluentui/react-icons";
import { cn } from "@/lib/utils/cn";
import GridPattern from "@/components/ui/grid-pattern";
import heroimage from '../../assets/Board.png'
import yawningEmoji from "../../assets/yawning_face_3d.png"
import '../../App.css'
import { ModeToggle } from "./mode-toggle";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const LandingPage: React.FC = () => {

    return (
        <section className="h-full relative w-full max-w-screen-lg mx-auto px-6 md:px-0">
            <header className="py-4 flex items-center justify-between w-full">
                <div className="text-2xl font-bold">conotes</div>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <Link className="w-full" target="_blank" to="https://github.com/coihsan/coeditor">
                        <Button size={'icon'} variant={'outline'}>
                            <GitHub />
                        </Button>
                    </Link>
                </div>
            </header>
            <div className="flex flex-col mb-9 pt-9 max-w-screen-sm mx-auto">
                <div className="uppercase px-2 py-1 rounded-full bg-creek-200 dark:bg-creek-900 border text-creek-800 dark:text-creek-200 border-creek-500 text-xs font-semibold w-max mx-auto inline-flex rotate-3">100% Open-source</div>
                <h1 className="text-5xl md:text-6xl font-[600] text-center pt-4 pb-8 md:pt-8 fontSora">Minimalistic <br /> <span className="text-creek-500 dark:text-creek-400">Note Taking App</span></h1>
                <p className="text-center text-muted-foreground text-lg md:text-xl"><strong className="font-semibold text-creek-400">Conotes is only available as a demo</strong>. Your notes will be saved to client-side storage and <strong className="font-semibold text-creek-400">not persisted in any database or cloud</strong>.</p>
            </div>
                <div className="w-full md:w-72 mx-auto flex flex-col md:flex-row justify-center items-center gap-2">
                        {isMobile ? (
                            <MobileNotice />
                        ) : (
                            <Link className="w-full" to="/app">
                                <Button size={'lg'} className="w-full flex items-center gap-2" variant={'default'}>
                                    Get Started
                                    <ChevronRight12Filled />
                                </Button>
                            </Link>
                        )}
                    <Link className="w-full" target="_blank" to="https://github.com/coihsan/coeditor">
                        <Button size={'lg'} className="w-full flex items-center gap-2" variant={'secondary'}>
                            <GitHub />
                            View on GitHub
                        </Button>
                    </Link>
                </div>
            <div className="py-9">
                <img className="rounded-2xl shadow-lg border" src={heroimage} alt="screenshot" />
            </div>
            <div className="py-9">
                <div>
                    <h1 className="text-4xl md:text-6xl font-semibold inline">
                        A Couple of Features <em>but</em> <span className="text-creek-500 dark:text-creek-400">You Don't Care About It!</span>
                    </h1>
                    <span className="inline-block"><img className="size-12" src={yawningEmoji} alt="yawning emoji" /></span>
                </div>
                <div className="grid md:grid-cols-2 gap-2 pt-9">
                    <Card>
                        <CardHeader>
                            <CardTitle>100% Open-source</CardTitle>
                            <CardDescription>We are not making this app for any commercial use.</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>No Ads or Advertising</CardTitle>
                            <CardDescription>Without any ads, this will make your experience on our app as smooth as possible.</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>No Tracking or Analytics</CardTitle>
                            <CardDescription>We don't collect any information from users.</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Support <Link className="text-blue-500 underline" target='_blank' to={'https://en.wikipedia.org/wiki/WYSIWYG'}>WYSIWYG</Link></CardTitle>
                            <CardDescription>We are use <Link to={'https://tiptap.dev/'} className="text-blue-500 underline" target='_blank'>Tiptap Editor</Link> as main library part of our app </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>No Database</CardTitle>
                            <CardDescription>All notes are only stored in your browser <Link className="text-blue-500 underline" target='_blank' to={'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API'}> (indexedDB)</Link> but don't provide any data sensitive</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>No Login</CardTitle>
                            <CardDescription>Only available for demo user w/o login or signup action</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Search Notes</CardTitle>
                            <CardDescription>Easely search all notes, or notes with specific tag</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Drag-n-drop</CardTitle>
                            <CardDescription>For easy management of notes</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
            <GridPattern
                width={30}
                height={30}
                x={-1}
                y={-1}
                strokeDasharray={"4 2"}
                className={cn(
                    "[mask-image:radial-gradient(600px_circle_at_top,white,transparent)] -z-50",
                )}
            />
            <footer className="py-9 text-center">
                Develop by <Link className="underline text-creek-500" target="_blank" to={'https://github.com/coihsan'}>coihsan</Link>
            </footer>
        </section>
    )
}

export default LandingPage;