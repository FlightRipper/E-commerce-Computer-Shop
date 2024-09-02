import React from 'react'
import CampaignImage from "../campaign.jpg"
import "../AdminDashboard.css";



const CampaignRequestsCard = () => {
  return (
       <div className="campaign-request-card p-0 rounded-4 d-flex flex-column my-3 no-gutters">
                <img src={CampaignImage} className="campaign-pic w-100 p-0 relative "></img>
                <div className="campaign-category">Medical</div>
                <h3 className="campaign-title h3 m-0 py-2 relative text-center">Help us grow</h3>
                <p className='px-3 py-1 campaign-description'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati veniam magnam eos nobis, consequatur at aperiam iste, rem eum nam sapiente hic quod a illum praesentium molestiae provident cupiditate possimus?</p>
                <p className='campaign-target text-center'>Target Amount: $ <span>2000</span></p>
                <p className='campaign-owner text-center'>Created by: <span>username</span></p>
                <div className='approve-reject-buttons d-flex flex-row align-items-center justify-content-between px-2'>
                <button type="button" className="btn btn-primary approve-button px-5">Approve</button>
                <button type="button" className="btn btn-primary reject-button px-5">Reject</button>
                </div>
            </div>
  )
}

export default CampaignRequestsCard
