import { useEffect, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { Select, Button, Input, DatePicker, Form } from "antd";
import moment from "moment";
import { getAllLocations } from "../actions/location";
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
}

const threeLengthArray = [];

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({});
  const [disButton, setDisButton] = useState(true);

  const checkButtonDisabled = val => {
    threeLengthArray.push(val);
    if(threeLengthArray.length >= 2){
      setDisButton(false)
    }
  };

  const onChangeFrom = val => {
    setFormData({ ...formData, ...{ startLocation: val } });
    checkButtonDisabled(val);
  };

  const onChangeTo = val => {
    setFormData({ ...formData, ...{ endLocation: val } });
    checkButtonDisabled(val);
  };

  const onChangeDate = val => {
    const journeyDate = val && moment(val._d).format("YYYY-MM-DD");
    console.log(val, journeyDate)
    setFormData({ ...formData, ...{ journeyDate } });
    // checkButtonDisabled(val);
  };

  const dummyTransition = (val) => {
    console.log({val})
    val.journeyDate = moment(val.journeyDate).format("YYYY-MM-DD")
    Router.push({
      pathname: "/buses",
      query: val
    });
  };

  useEffect(() => {
    fetchAllLocations();
  }, []);

  const fetchAllLocations = async () => {
    const locations = await getAllLocations();
    setLocations(locations);
  };

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/static/favicon.ico" importance="low" />
      </Head>

      <Layout>
        <div className="hero">
          <Hero />

          <div className="row">
            <div className="input-background">
              <h1 className="tag-line">Get Seat Go</h1>
                <Form className="route-form" name='travel-form' onFinish={dummyTransition}>
                <div>
                  <label htmlFor="">
                    <h4 className="color-white">From: </h4>
                  </label>
                  <Form.Item rules={[ { required: true, message: 'Enter Boarding Location', } ]}  name='startLocation'>
                    <Select
                      showSearch
                      placeholder="eg- Kolkata"
                      style={{ width: 200, marginRight: "1rem" }}
                      optionFilterProp="children"
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                    >
                      {locations.map(location => (
                        <Option value={location._id} key={location._id}>
                          {location.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                
                <div>
                  <label htmlFor="">
                    <h4 className="color-white">To: </h4>
                  </label>
                    <Form.Item rules={[ { required: true, message: 'Enter Destination Location', } ]} name='endLocation' >
                    <Select
                      showSearch
                      style={{ width: 200, marginRight: "1rem" }}
                      placeholder="eg- Delhi"
                      optionFilterProp="children"
                      // onChange={onChangeTo}
                      // name="endLocation"
                      // onFocus={onFocus}
                      // onBlur={onBlur}
                      // onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {locations.map(location => (
                        <Option value={location._id} key={location._id}>
                          {location.name}
                        </Option>
                      ))}
                    </Select>
                    </Form.Item>
                  </div>

                <div>
                  <label htmlFor="">
                    <h4 className="color-white">Date: </h4>
                  </label>
                  <Form.Item name='journeyDate' >
                    <DatePicker
                      style={{ width: 200, marginRight: "1rem" }}
                      format="YYYY-MM-DD"
                      disabledDate={disabledDate}
                      onChange={onChangeDate}
                    />
                  </Form.Item>

                </div>


                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                    style={{ marginLeft: "1rem" }}
                    // onClick={dummyTransition}
                    // disabled={disButton}
                  >
                    Search
                  </Button>
                </Form.Item>
              
                </Form>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
