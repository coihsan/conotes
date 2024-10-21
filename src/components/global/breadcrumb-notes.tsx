import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getNotesTitle } from "@/lib/utils/helpers";
import { Home24Regular } from "@fluentui/react-icons";
import React from "react";
import { Link } from "react-router-dom";

type routeName = {
    params: string
}
const BreadcrumbNotes: React.FC<routeName> = ({params}) => {

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link to={'/app'}><Home24Regular /></Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{getNotesTitle(params)}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
export default BreadcrumbNotes