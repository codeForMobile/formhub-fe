import { gql, useQuery } from '@apollo/client'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { startCase, uniq } from 'lodash'
import { SubmissionsQuery } from '../gql/graphql'

const Dashboard = () => {
  const { data, error, loading } = useQuery<SubmissionsQuery>(gql`
    query Submissions {
        submissions {
            id
            submittedAt
            data
        }
    }
  `)
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error:{error.message}</div>
  
  // TODO: Type data for correct submissions type.
  const { submissions } = data!
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 300},
    { field: 'submittedAt', headerName: 'submittedAt', width:200},
    ...uniq(submissions.flatMap((s: any) => Object.keys(s.data))).map((field:string) => ({
        field,
        headerName: startCase(field)
    }))
  ];

  return (
   // original version 
   //<div>{JSON.stringify(data)}</div>
   <div style={{ height: 300, width: '100%' }}>
    <DataGrid 
        rows={submissions}
        columns={columns}
        pageSize={5}
    />
    </div>
  )
}

export default Dashboard