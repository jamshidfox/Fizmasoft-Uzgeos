import { Table, Card, CardHeader, CardBody} from 'reactstrap'
import { Airplay} from "react-feather"

const TableResponsive = () => {
  return (
    <Card>
      <CardHeader>
      <h3>
        <Airplay size={20} className="mr-2"/>
        Tasks on your PC
      </h3>
        </CardHeader>
      <CardBody>
            <Table responsive>
              <thead>
                <tr>
                  <th scope='col' className='text-nowrap'>
                    Name
                  </th>
                  <th scope='col' className='text-nowrap'>
                    <span>58% </span>
                    CPU
                  </th>
                  <th scope='col' className='text-nowrap'>
                    <span>34% </span>
                    Memory
                  </th>
                  <th scope='col' className='text-nowrap'>
                    <span>65% </span>
                    Disk
                  </th>
                  <th scope='col' className='text-nowrap'>
                    <span>33% </span>
                    Network
                  </th>
                  <th scope='col' className='text-nowrap'>
                    <span>22% </span>
                    GPU
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='text-nowrap'>1 SrviveHost...</td>
                  <td className='text-nowrap'>26.6%</td>
                  <td className='text-nowrap'>456.4 MB</td>
                  <td className='text-nowrap'>0.12 MB/s</td>
                  <td className='text-nowrap'>0 Mbps</td>
                  <td className='text-nowrap'>0%</td>
                </tr>
                <tr>
                  <td>2 Visual Studio</td>
                  <td className='text-nowrap'>45.1%</td>
                  <td className='text-nowrap'>12.5 MB</td>
                  <td className='text-nowrap'>12.4 MB/s</td>
                  <td className='text-nowrap'>1 Mbps</td>
                  <td className='text-nowrap'>1%</td>
                </tr>
                <tr>
                  <td>3 Yandex Disk</td>
                  <td className='text-nowrap'>25.1%</td>
                  <td className='text-nowrap'>42.5 MB</td>
                  <td className='text-nowrap'>32.4 MB/s</td>
                  <td className='text-nowrap'>2 Mbps</td>
                  <td className='text-nowrap'>10%</td>
                </tr>
                <tr>
                  <td>4 NextCloud</td>
                  <td className='text-nowrap'>65.3%</td>
                  <td className='text-nowrap'>1.5 MB</td>
                  <td className='text-nowrap'>22.4 MB/s</td>
                  <td className='text-nowrap'>4 Mbps</td>
                  <td className='text-nowrap'>5%</td>
                </tr>
              </tbody>
            </Table>
        </CardBody>
    </Card>
  )
}

export default TableResponsive