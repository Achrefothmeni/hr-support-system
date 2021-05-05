/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import  Modals from '../../components/Modals.js'
import {useSelector , useDispatch} from  'react-redux'
import { listSettings , deleteSettings } from '../../actions/settingsAction'
import { Link } from "react-router-dom";

const Tables = ({ history}) => {
  const settingDelete = useSelector((state) => state.settingDelete)
  const {success: successDelete} = settingDelete
  const deleteHandler = (id) => {
    dispatch(deleteSettings(id))
  }

  const [callback, setCallback] = useState(false)

  useEffect(() => {
 
      dispatch(listSettings())
    
  }, [dispatch, history, successDelete ])

  const dispatch = useDispatch()

const settingList = useSelector(state => state.settingList)

const {loading , error , settings} = settingList
    useEffect( () => {
      dispatch(listSettings())
    } , [dispatch,callback])

    console.log(settings)
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Card tables</h3>
                <Modals  />
              </CardHeader>
              <br></br>              <br></br>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Job Description</th>
                    <th scope="col">Skills</th>
                    <th scope="col">  Country </th>
                    <th scope="col">City</th>
                    <th scope="col">Postal code</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {settings.map( setting => (
                       <tr key={setting._id}>
                       <th scope="row">

                             <span className="mb-0 text-sm">
                             {setting.settingName}
                             </span>

                       </th>
                       <td>
                  {setting.skills.map((e) => (
                   <span className="mb-0 text-sm"> {e.name} </span>
                  ))}
                      </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                       {setting.country}
                      </Badge>
                    </td>
                    <td>
                    {setting.city}
                    </td>
                    <td>
                    {setting.postalCode}
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                     
                          <DropdownItem
                          
                           to={`/admin/settings-edit/${setting._id}`} tag={Link}
                          
                          >
                            Modify
                          </DropdownItem>
                          
                          <DropdownItem
                            href="#pablo"
                            onClick={() => deleteHandler(setting._id)}
                          >
                            Delete
                          </DropdownItem>

                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  ))}



                  <tr>
                    <th scope="row">

                          <span className="mb-0 text-sm">
                            Full Stack Js developer
                          </span>

                    </th>
                    <td>
                      JavaScript , Express , NodeJs , React
                      </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        Tunisia
                      </Badge>
                    </td>
                    <td>
                     Ariana
                    </td>
                    <td>
                    2037
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Modify
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete
                          </DropdownItem>

                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>

                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
        {/* Dark table */}
      </Container>
    </>
  );
};

export default Tables;
