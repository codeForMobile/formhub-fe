import { gql, useQuery } from '@apollo/client'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

const Dashboard = () => {
  const { data, loading } = useQuery(gql`
    query SubmissionsQuery {
        submissions {
            id
            submittedAt
            data
        }
    }
  `)
  
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 300},
    { field: 'submittedAt', headerName: 'submittedAt', width:200},
  ];
  
  if (loading) return <div>Loading...</div>
  return (
   // original version 
   //<div>{JSON.stringify(data)}</div>
   <div style={{ height: 300, width: '100%' }}>
    <DataGrid 
        rows={data.submissions} 
        columns={columns} 
    />
    </div>
  )
}

export default Dashboard