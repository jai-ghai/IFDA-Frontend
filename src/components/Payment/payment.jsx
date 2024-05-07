import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { buyPayment } from '../../redux/actions/user';
import { server } from '../../redux/store';
import logo from '../../assests/images/logo (1).png';

const Payment = ({ user }) => {
    const dispatch = useDispatch();
  const [key, setKey] = useState('');

  const { loading, error, paymentId } = useSelector(state => state.payment);
  const { error: courseError } = useSelector(state => state.course);

  const paymentHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/razorpaykey`);
      setKey(data.key);
      dispatch(buyPayment(data.key, user)); // Assuming buySubscription takes key and user as parameters
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error while fetching Razorpay key');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' }); // Make sure 'clearError' is handled in your reducer
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' }); // Make sure 'clearError' is handled in your reducer
    }
    if (paymentId) {
      const openPopUp = () => {
        if (window.Razorpay) {
          const options = {
            key,
            name: 'IFDAInstitute',
            description: 'Get access to all premium content',
            image: logo,
            subscription_id: paymentId,
            callback_url: `${server}/paymentverification`,
            prefill: {
              name: user.name,
              email: user.email,
              contact: '',
            },
            notes: {
              address: 'Ifda institute',
            },
            theme: {
              color: '#0078d4',
            },
          };

          const razor = new window.Razorpay(options);
          razor.open();
        } else {
          console.error('Razorpay SDK not loaded.');
        }
      };

      openPopUp();
    }
  }, [dispatch, error, courseError, user, key, paymentId]);
  return (
    <Container h="90vh" p="16">
    <Heading children="Welcome" my="8" textAlign="center" />

    <VStack
      boxShadow="lg"
      alignItems="stretch"
      borderRadius="lg"
      spacing="0"
    >
      <Box bg="blue.400" p="4" borderRadius="8px 8px 0 0">
        <Text color="black" children="Pro Pack - ₹4999.00" />
      </Box>
      <Box p="4">
        <VStack textAlign="center" px="8" mt="4" spacing="8">
          <Text children="Join IFDA Instute and get access to our content." />
          <Heading size="md" children="₹4999 Only" />
        </VStack>

        <Button
          my="8"
          w="full"
          colorScheme="blue"
          onClick={paymentHandler}
          isLoading={loading}
        >
          Buy Now
        </Button>
      </Box>

      <Box bg="blackAlpha.600" p="4" borderRadius="0 0 8px 8px">
        <Heading
          color="white"
          textTransform="uppercase"
          size="sm"
          children="100% refund at cancellation"
        />

        <Text fontSize="xs" color="white" children="*Terms & Conditions Apply" />
      </Box>
    </VStack>
  </Container>
  )
}

export default Payment;