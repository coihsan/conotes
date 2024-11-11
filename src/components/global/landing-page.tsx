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
import { FEATURESAPP } from "@/lib/constants";

const LandingPage: React.FC = () => {

    return (
        <section className="h-full relative w-full max-w-screen-lg mx-auto px-6 md:px-0">
            <header className="py-4 flex items-center justify-between w-full">
                <div className="text-2xl font-semibold fontChilax">NulihApp</div>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <Link className="w-full" target="_blank" to="https://github.com/coihsan/nulihapp">
                        <Button size={'icon'} variant={'outline'}>
                            <GitHub />
                        </Button>
                    </Link>
                </div>
            </header>
            <div className="flex flex-col mb-9 pt-9 max-w-screen-sm mx-auto">
                <div className="uppercase px-2 py-1 rounded-full bg-zinc-200 dark:bg-zinc-900 border text-zinc-800 dark:text-zinc-200 border-zinc-500 text-xs font-semibold w-max mx-auto inline-flex rotate-3">100% Open-source</div>
                <h1 className="text-5xl md:text-6xl font-[600] text-center pt-4 pb-8 md:pt-8 fontChilax">Minimalistic<br /> Note Taking App</h1>
                <p className="text-center text-md md:text-xl">NulihApp is only available as a demo version.  All notes you create are stored in client-side storage and not persisted in any database or cloud.</p>
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
                    <Link className="w-full" target="_blank" to="https://github.com/coihsan/nulihapp">
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
                    <h1 className="text-4xl md:text-6xl font-semibold inline fontChilax">
                    Some features <em>but</em><span className="text-zinc-500 dark:text-zinc-400"> that doesn't really matter!</span>
                    </h1>
                    <span className="inline-block"><img className="size-12" src={yawningEmoji} alt="yawning emoji" /></span>
                </div>
                <div className="grid md:grid-cols-2 gap-2 pt-9">
                    {FEATURESAPP.map((item, index) => (
                        <Card key={index}>
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        </Card>
                    ))}
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
            <footer className="py-9 text-center text-sm">
                Author by <Link className="underline text-zinc-500" target="_blank" to={'https://github.com/coihsan'}>coihsan</Link>
            </footer>
        </section>
    )
}

export default LandingPage;