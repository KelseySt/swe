//UNCOMMENT FROM LINE 3 - 95 FOR SCRAPE LOGIC APPROACH

// "use client";
// import React from "react";
// import {Card, CardHeader, CardBody, CardFooter, Link} from "@heroui/react";
// import { fetchLinkedInFromDuckDuckGo } from "@/app/apiFunctions/duckScraper";
// import { getLinkedInProfiles } from "../apiFunctions/linkedinProfiles";

// interface AlumniCardProps {
//    school: string;
//    company: string;
// }
// export default function AlumniCard({school, company }: AlumniCardProps) {  
    
    
    

//     //CALLING THE GET PROFILES FUNCTION
//     async function getProfiles() {
//         try {
//           const linkedInProfiles = await getLinkedInProfiles(school, company);
//           console.log(linkedInProfiles);
//           return (
//             <div>
//               {linkedInProfiles.map((profile, index) => (
//                 <div key={index} style={{ margin: 20, padding: 20, border: '1px solid #ccc', borderRadius: 10 }}>
//                   <h2>{profile.name}</h2>
//                   <p>{profile.headline}</p>
//                   <p>
//                     <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
//                       View LinkedIn Profile
//                     </a>
//                   </p>
//                 </div>
//               ))}
//             </div>
//           );
//         } catch (error) {
//           console.error('Error:', error);
//         }
//       }

//       getProfiles();
      

  


    
//     return (
//         <div>
//             lol
//         </div>

//     //     <div className="h-[600px] overflow-y-auto pr-2">
//     //       {(companyAb === "AMZN" ? amazonPeople : companyAb === "GOOGL" ? googlePeople : []).map(
//     //         (person: { name: string; headline: string; linkedinUrl: string }) => (
//     //           <Card
//     //             key={person.linkedinUrl}
//     //             className="max-w-[340px] p-6 bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto mt-10"
//     //           >
//     //             <h1 className="text-3xl text-[#233889] font-bold mb-6 text-center">Alumni</h1>
//     //             <div className="bg-white border border-[#D8C0CF] rounded-lg p-4 shadow flex flex-col justify-between items-center">
//     //               <CardHeader className="justify-between">
//     //                 <div className="flex gap-5">
//     //                   <div className="flex flex-col gap-1 items-start justify-center">
//     //                     <h4 className="text-small font-semibold leading-none text-default-600">
//     //                       {person.name}
//     //                     </h4>
//     //                   </div>
//     //                 </div>
//     //               </CardHeader>
//     //               <CardBody className="px-4 py-0 text-small text-gray-700">
//     //                 <p>{person.headline}</p>
//     //               </CardBody>
//     //               <CardFooter className="gap-3">
//     //                 <div className="flex flex-col">
//     //                   <Link
//     //                     href={person.linkedinUrl}
//     //                     isExternal
//     //                     className="text-sm text-[#233889] hover:underline"
//     //                     showAnchorIcon
//     //                   >
//     //                     {person.linkedinUrl}
//     //                   </Link>
//     //                 </div>
//     //               </CardFooter>
//     //             </div>
//     //           </Card>
//     //         )
//     //       )}
//     //     </div>
//     //   );
//     );
// }

//UNCOMMENT/COMMENT ALL OF THIS CODEE FOR HARD CODE APROACH
//MAKE SURE IN COMPANYCLIENTPAGE.TSX - UNCOMMENT THE COMMENTED CALL

"use client";
import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Link} from "@heroui/react";
import { fetchLinkedInFromDuckDuckGo } from "@/app/apiFunctions/duckScraper";
import { getLinkedInProfiles } from "../apiFunctions/linkedinProfiles";
import { useAuth } from "../useAuth";

interface AlumniCardProps {
    companyAb: string;
}

export default function AlumniCard({companyAb }: AlumniCardProps) {  
    
    //amazon
    const amazonPeople =  [
        {
          name: 'Sagarika Dutta',
          headline: 'Amazon - LinkedIn',
          linkedinUrl: 'https://www.linkedin.com/in/sagarikadutta'
        },
        {
          name: 'Steven Strasberg',
          headline: 'Principal Legal Counsel, Amazon Business - LinkedIn',
          linkedinUrl: 'https://www.linkedin.com/in/steven-strasberg'
        },
        {
          name: 'Taylor Patterson',
          headline: 'Program Manager - Amazon | LinkedIn',
          linkedinUrl: 'https://www.linkedin.com/in/taylor-patterson2020'
        },
        {
          name: 'Funso A.',
          headline: 'Senior Vendor Manager (Category Manager) - Amazon - LinkedIn',
          linkedinUrl: 'https://www.linkedin.com/in/adewuyigabriel'
        },
        {
          name: 'Alvin Borum',
          headline: 'Amazon - LinkedIn',
          linkedinUrl: 'https://www.linkedin.com/in/alvin-borum'
        },
        {
          name: 'Igor Kiselev MBA, PSPO I',
          headline: 'Amazon | LinkedIn',
          linkedinUrl: 'https://www.linkedin.com/in/kiselev-igor'
        },
        {
          name: 'Garrick Bodine',
          headline: 'Amazon - LinkedIn',
          linkedinUrl: 'https://www.linkedin.com/in/garrick-bodine'
        },
        {
          name: 'Diana Haiden',
          headline: 'Amazon - LinkedIn',
          linkedinUrl: 'https://www.linkedin.com/in/diana-haiden-943367143'
        },
        {
          name: 'Vishakha Tiwari',
          headline: 'Senior Program Manager - Amazon - LinkedIn',
          linkedinUrl: 'https://www.linkedin.com/in/vishakha-tiwari-mba'
        },
        {
          name: 'Oscar Lopez',
          headline: 'Amazon - LinkedIn',
          linkedinUrl: 'https://www.linkedin.com/in/oscar-lopez-b3b48a141'
        }
      ]

      //google
      const googlePeople = [
        {
            "name": "Dustin Nguyen",
            "headline": "Software Engineer - Google - LinkedIn",
            "linkedinUrl": "https://www.linkedin.com/in/dustin-nguyen-9b8485132"
        },
        {
            "name": "Weiwen Xu",
            "headline": "Google - LinkedIn",
            "linkedinUrl": "https://uk.linkedin.com/in/weiwenxu"
        },
        {
            "name": "Jeanie Kim",
            "headline": "Google - LinkedIn",
            "linkedinUrl": "https://www.linkedin.com/in/jeaniekim1"
        },
        {
            "name": "Ellen Clarke",
            "headline": "Security Counsel - Google - LinkedIn",
            "linkedinUrl": "https://www.linkedin.com/in/ellenclarke"
        },
        {
            "name": "Mackenzee Bumgarner",
            "headline": "Google Books Project Coordinator - LinkedIn",
            "linkedinUrl": "https://www.linkedin.com/in/mackenzee-bumgarner18"
        }
    ]
    

    
      

    // Showing that only logged in users can see alumni
    const { user } = useAuth();
   
    if(!user) return <div>Log in to see your alumni network!</div>;
    
    return (
        

        <div className="h-[600px] overflow-y-auto pr-2">
          {(companyAb === "AMZN" ? amazonPeople : companyAb === "GOOGL" ? googlePeople : []).map(
            (person: { name: string; headline: string; linkedinUrl: string }) => (
              <Card
                key={person.linkedinUrl}
                className="max-w-[340px] p-6 bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto mt-10"
              >
                <h1 className="text-3xl text-[#233889] font-bold mb-6 text-center">Alumni</h1>
                <div className="bg-white border border-[#D8C0CF] rounded-lg p-4 shadow flex flex-col justify-between items-center">
                  <CardHeader className="justify-between">
                    <div className="flex gap-5">
                      <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                          {person.name}
                        </h4>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="px-4 py-0 text-small text-gray-700">
                    <p>{person.headline}</p>
                  </CardBody>
                  <CardFooter className="gap-3">
                    <div className="flex flex-col">
                      <Link
                        href={person.linkedinUrl}
                        isExternal
                        className="text-sm text-[#233889] hover:underline"
                        showAnchorIcon
                      >
                        {person.linkedinUrl}
                      </Link>
                    </div>
                  </CardFooter>
                </div>
              </Card>
            )
          )}
        </div>
      );
    
}
