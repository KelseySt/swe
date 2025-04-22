"use client";
import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Link} from "@heroui/react";
import { fetchLinkedInFromDuckDuckGo } from "@/app/apiFunctions/duckScraper";


export default function AlumniCard() {  
    
    //google
    const peopleInformation = [
        {name: "Zoey Lang",
            headline : "Software Engineer at Google",
            link: "ddd", //linkedin
        },
        {name: "Alex Rivera",
            headline : "Product Manager at Google",
            link: "ddd", //linkedin
        }
    ]

    const [people, setPeople] = React.useState<any[]>([]);


    
  return (    
    <Card className="max-w-[340px] p-6 bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto mt-10">
        <h1 className="text-3xl text-[#233889] font-bold mb-6 text-center">Alumni</h1>
        <div className="bg-white border border-[#D8C0CF] rounded-lg p-4 shadow flex flex-col justify-between items-center">
        <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-4 py-0 text-small text-gray-700">
        <p>Headline</p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex flex-col">
        <Link
                href="https://github.com/heroui-inc/heroui"
                isExternal
                className="text-sm text-[#233889] hover:underline"
                showAnchorIcon
              >
                LinkedIn.com
                </Link>
        </div>
      </CardFooter>
        </div>
    </Card>
  );
}

