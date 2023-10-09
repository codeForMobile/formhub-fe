import { gql, useQuery } from '@apollo/client'

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

  if (loading) return <div>Loading...</div>
  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export default Dashboard