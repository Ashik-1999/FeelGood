import React from 'react'
import TransactionChart from '../../../components/Admin/transactionchart/TransactionChart'
import DashboardStatusCard from '../../../components/Admin/DashboardStatusCard/DashboardStatusCard'
import DashboardPieChart from '../../../components/Admin/pieChart/DashboardPieChart'
import RecentOrders from '../../../components/Admin/recentorders/RecentOrders'
import PopularProducts from '../../../components/Admin/popularproducts/PopularProducts'
import AdminNavbar from '../../../components/Admin/adminNavbar/AdminNavbar'
function Dashboard() {
  return (
    <div className='w-full'>
      <AdminNavbar/>
      <div className="flex flex-col gap-4">
      <DashboardStatusCard />
      <div className="flex flex-row gap-4">
        <TransactionChart />
        <DashboardPieChart />
      </div>
      <div className="flex flex-row gap-4">
        <RecentOrders />
        <PopularProducts />
      </div>
      </div>
    </div>
    
  )
}

export default Dashboard
