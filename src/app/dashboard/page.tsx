
"use client";

import React from 'react';

interface Params {
  slug: string;
}



const Dashboard = ({params}: { params: Params }) => {
let category=["general","voting_sites","test1"]
if (category.includes(params.slug)){
  return <div> my post:{params.slug}</div>
}
else{
  return <div> invalid </div>
}
  return <div> my post:{params.slug}</div>
}

export default Dashboard;

