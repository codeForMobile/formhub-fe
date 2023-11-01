import { gql, useMutation, useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { startCase, uniq } from 'lodash'
import { SubmissionsQuery } from '../gql/graphql'


const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
`;

const Toolbar = styled.div`
  background: #eee;
  display: flex;
  justify-content: flex-end;
  padding: 15px;
`;

const Button = styled.div`
  background: black;
  color: white;
  padding: 10px;
  border-radius: 8px;
  border: none;
`;

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


  const [generateSubmissions] = useMutation(gql`
    mutation GenerateSubmissions($count: Int!) {
      queueSubmissionGeneration(count: $count)
    }
  `, {variables: {count:10}})


  if (loading) return <div>Loading...</div>
  if (error) return <div>Error:{error.message}</div>
  
  // TODO: Type data for correct submissions type.
  const { submissions } = data!
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 300},
    { field: 'submittedAt', headerName: 'submittedAt', width:200},
    ...uniq(submissions.flatMap((s: any) => Object.keys(s.data))).map((field:string) => ({
        field,
        headerName: startCase(field),
        width: 200,
        valueGetter: (params: GridValueGetterParams) => params.row.data[field]
    }))
  ];

  return (
   // original version 
   //<div>{JSON.stringify(data)}</div>
    <Container>
      <Toolbar>
        <Button onClick={() => generateSubmissions()}>Generate Submissions</Button>
      </Toolbar>
    <DataGrid 
        rows={submissions}
        columns={columns}
        pageSize={15}
    />
    </Container>
  )
}

export default Dashboard