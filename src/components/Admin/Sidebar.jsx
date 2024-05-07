import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
// import { GiPoliceBadge } from "react-icons/gi";
// import { GrValidate } from "react-icons/gr";
import { FaCcPaypal } from "react-icons/fa";
// import { IoTvOutline } from "react-icons/io5";
// import { MdConnectedTv } from "react-icons/md";




import {
  RiAddCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
} from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  return (
    <VStack spacing={'8'} p="16" boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}>
      <LinkButton
        Icon={RiDashboardFill}
        text="Dashboard"
        url={'dashboard'}
        active={location.pathname === '/admin/dashboard'}
      />
      <LinkButton
        Icon={RiAddCircleFill}
        text="Create Course"
        url={'createcourse'}
        active={location.pathname === '/admin/createcourse'}
      />
      <LinkButton
        Icon={RiAddCircleFill}
        text="Update Course"
        url={'updatecourse'}
        active={location.pathname === '/admin/updatecourse '}
      />
      <LinkButton
        Icon={RiAddCircleFill}
        text="Create Module"
        url={'createmodule'}
        active={location.pathname === '/admin/createmodule '}
      />
      <LinkButton
        Icon={RiAddCircleFill}
        text="Create Test"
        url={'createtest'}
        active={location.pathname === '/admin/createtest '}
      />

      <LinkButton
        Icon={RiEyeFill}
        text="Courses"
        url={'courses'}
        active={location.pathname === '/admin/courses'}
      />
      <LinkButton
        Icon={RiUser3Fill}
        text="Users"
        url={'users'}
        active={location.pathname === '/admin/users'}
      />
      <LinkButton
        Icon={FaCcPaypal}
        text="Access"
        url={'access'}
        active={location.pathname === '/admin/access'}
      />
    </VStack>
  );
};

export default Sidebar;

function LinkButton({ url, Icon, text, active }) {
  return (
    <Link to={`/admin/${url}`}>
      <Button
        fontSize={'larger'}
        variant="ghost"
        colorScheme={active ? 'purple' : ''}
      >
        <Icon style={{ margin: '4px' }} />
        {text}
      </Button>
    </Link>
  );
}
