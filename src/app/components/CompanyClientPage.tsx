"use client";
import { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { companies } from "@/app/apiFunctions/companies";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/app/useAuth";
import { db } from "../firebase"; 
import { doc, getDoc } from "firebase/firestore"; //added import
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import PostForm from "./PostForm";
import PostHistory from "./CompanyPostHistory";
import AlumniCard from "./AlumniCard";
import { fetchLinkedInFromDuckDuckGo } from "../apiFunctions/duckScraper";

type Metric = {
  fiscalYear: string;
  currentRatio: number;
  quickRatio: number;
  debtToEquity: number;
  operatingMargin: number;
  netMargin: number;
};

export default function CompanyClientPage({
  company,
  metrics,
}: {
  company: string;
  metrics: Metric[];
}) {
  const [index, setIndex] = useState(0);
  const { user } = useAuth(); // Get the current authenticated user
  const [userData, setUserData] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);

  // Fetch user data when the user is logged in
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          console.log("Fetching user data for:", user.uid);
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            console.log("User data fetched:", data);
            setUserData(data);
          } else {
            console.log("No user data found!");
            setUserData(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData(null);
        }
      } else {
        console.log("No authenticated user");
        setUserData(null);
      }
      setUserLoading(false);
    };

    fetchUserData();
  }, [user]);

  const handlePrevious = () => {
    setIndex((prev) => Math.min(prev + 1, metrics.length - 1));
  };

  const handleNext = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const currentData = metrics[index];
  const companyObject = companies.find((c) => c.abrev === company);
  const companyAbbrev = company;
  const companyFullName = companyObject ? companyObject.name : company;
  const companyCommonName = companyObject?.commonName ?? "Unknown";
  const companyLink = companyObject ? companyObject.link : "#";
  const companyLogo = companyObject ? companyObject.logo : "#";

  const firstYear = metrics[metrics.length - 1];
  const mostRecentYear = metrics[0];

  const netMarginChange = mostRecentYear.netMargin - firstYear.netMargin;
  const isIncrease = netMarginChange > 0;
  
  console.log("User college:", userData?.college);
  
  const percentageChange = (
    (netMarginChange / firstYear.netMargin) *
    100
  ).toFixed(2);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br p-6">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[1200px] p-10 space-y-6">
        <div className="flex justify-start mt-10 md:mt-12">
          <div className="w-full md:w-auto">
            <CompanyCard
              fiscalYear={currentData.fiscalYear}
              company={companyFullName}
              companyLink={companyLink}
              companyLogo={companyLogo}
              currentRatio={currentData.currentRatio}
              quickRatio={currentData.quickRatio}
              debtToEquity={currentData.debtToEquity}
              operatingMargin={currentData.operatingMargin}
              netMargin={currentData.netMargin}
              onPrev={handlePrevious}
              onNext={handleNext}
              disablePrev={index >= metrics.length - 1}
              disableNext={index <= 0}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border rounded-xl shadow-lg w-full col-span-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Net Margin Trend
            </h3>
            <LineChart width={300} height={150} data={metrics}>
              <Line type="monotone" dataKey="netMargin" stroke="#f87171" />
              <XAxis dataKey="fiscalYear" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
            {currentData.netMargin < 5 && (
              <div className="text-red-500 mt-2">
                Low Profit Margin: Below 5%
              </div>
            )}
            {currentData.netMargin >= 5 && currentData.netMargin < 10 && (
              <div className="text-orange-500 mt-2">
                Moderate Profit Margin: 5% - 10%
              </div>
            )}
            {currentData.netMargin >= 10 && (
              <div className="text-green-500 mt-2">
                Healthy Profit Margin: Above 10%
              </div>
            )}
          </div>
          <div className="p-6 border rounded-xl shadow-lg w-full col-span-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Net Margin Comparison
            </h3>
            <div className="flex flex-col space-y-4">
              {/* First Year */}
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">First Year</span>
                <span className="text-xl font-semibold text-gray-700">
                  {firstYear.fiscalYear}: {firstYear.netMargin}%
                </span>
              </div>

              {/* Most Recent Year */}
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Most Recent Year</span>
                <span className="text-xl font-semibold text-gray-700">
                  {mostRecentYear.fiscalYear}: {mostRecentYear.netMargin}%
                </span>
              </div>

              {/* Increase or Decrease Indicator */}
              <div className="flex items-center space-x-2">
                {isIncrease ? (
                  <ArrowUpIcon className="h-6 w-6 text-green-500" />
                ) : (
                  <ArrowDownIcon className="h-6 w-6 text-red-500" />
                )}
                <span
                  className={`text-lg font-semibold ${
                    isIncrease ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {Math.abs(netMarginChange).toFixed(2)}% (
                  {isIncrease ? "↑" : "↓"} {percentageChange}%)
                </span>
              </div>
            </div>
          </div>
          <div className="p-6 border rounded-xl shadow-lg w-full col-span-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Operating Margin
            </h3>
            <div className="text-2xl font-semibold text-gray-700 mb-4">
              {currentData.operatingMargin}
            </div>
            <LineChart width={300} height={150} data={metrics}>
              <Line
                type="monotone"
                dataKey="operatingMargin"
                stroke="#34d399"
              />
              <XAxis dataKey="fiscalYear" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border rounded-xl shadow-lg w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Current Ratio
            </h3>
            <div className="text-2xl font-semibold text-gray-700 mb-4">
              {currentData.currentRatio}
            </div>
            <LineChart width={300} height={150} data={metrics}>
              <Line type="monotone" dataKey="currentRatio" stroke="#6366f1" />
              <XAxis dataKey="fiscalYear" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>

            {currentData.currentRatio < 1 && (
              <div className="text-red-500 mt-2">
                Critical: Current Ratio is below 1.
              </div>
            )}
            {currentData.currentRatio >= 1 &&
              currentData.currentRatio < 1.2 && (
                <div className="text-orange-500 mt-2">
                  Warning: Current Ratio is below 1.2.
                </div>
              )}
            {currentData.currentRatio >= 1.2 &&
              currentData.currentRatio <= 2 && (
                <div className="text-green-500 mt-2">
                  Healthy: Current Ratio is within range (1.2 - 2).
                </div>
              )}
          </div>

          <div className="p-6 border rounded-xl shadow-lg w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Quick Ratio
            </h3>
            <div className="text-2xl font-semibold text-gray-700 mb-4">
              {currentData.quickRatio}
            </div>
            <LineChart width={300} height={150} data={metrics}>
              <Line type="monotone" dataKey="quickRatio" stroke="#60a5fa" />
              <XAxis dataKey="fiscalYear" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
            {currentData.quickRatio < 1 && (
              <div className="mt-4 flex items-center text-red-500">
                <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">
                  Warning: Quick Ratio is below 1!
                </span>
              </div>
            )}
          </div>
          <div className="p-6 border rounded-xl shadow-lg w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Debt to Equity
            </h3>
            <LineChart width={300} height={150} data={metrics}>
              <Line type="monotone" dataKey="debtToEquity" stroke="#facc15" />
              <XAxis dataKey="fiscalYear" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </div>
          <PostForm selectedCompany={company} />
          <PostHistory company={company} />

          {/* Pass the user's college data to AlumniCard */}
          <AlumniCard 
            school={userData?.college || "Unknown"} 
            company={companyCommonName} 
          />
        </div>
      </div>
    </div>
  );
}

