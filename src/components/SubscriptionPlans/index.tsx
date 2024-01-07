import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import Header from '../Header';
import { tokens } from '../../theme';
import { AlertInfo, useAlert } from '../Alerts/Alert';
import { useAuth, useUpdateUser } from '../../auth/AuthContext';
import { updateData } from '../general';

interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  features: string[];
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 1,
    name: 'Monthly Plan',
    price: 29.99,
    features: ['POS'],
  },
  {
    id: 2,
    name: 'Yearly Plan',
    price: 129.99,
    features: ['POS'],
  },
];

const SubscriptionPlans: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const updateAlert = useAlert()
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const auth = useAuth()
  const updateUser = useUpdateUser()

  useEffect(() => {
    setSelectedPlan(auth.payment_plan)
  }, [])

  const handlePlanSelect = async (planId: number) => {
    const result = await updateData('payment/update_payment_plan', {"payment_plan": planId})
    console.log(result)
    if (result.success) {
      var user: any = Object()
      user = auth
      user.payment_plan = planId
      updateUser(user)
      const alertInfo: AlertInfo = {
        message: result && result.data.message ? result.data.message : result.message,
        open: true,
        severity: "success"
      }
      updateAlert(alertInfo)
    }
    else {
      const alertInfo: AlertInfo = {
        message: result.response && result.response.data.error ? result.response.data.error : result.data.message ? result.data.message : result.message,
        open: true,
        severity: "error"
      }
      updateAlert(alertInfo)
    }
    setSelectedPlan(planId);
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: colors.primary[400]
    }}>
      <Box className="box_shadow" sx={{
        borderRadius: '7px',
        background: colors.primary[400],
        padding: '15px',
        alignItems: 'center',
        textAlign: 'center',
        width: '85%'
      }}>

        <Header title="Subscription Plans" subtitle="Choose your subscription plan" />
        <Container>
          {/* <Typography variant="h3" component="h1" gutterBottom>
            Subscription Plans
          </Typography> */}
          <Grid container spacing={2}>
            {subscriptionPlans.map((plan) => (
              <Grid item xs={12} sm={6} md={6} key={plan.id}>
                <Card
                  sx={{
                    border: selectedPlan === plan.id ? `2px solid ${colors.blueAccent[400]}` : '1px solid #ccc',
                    minHeight: 200,
                    background: colors.primary[500]
                  }}
                >
                  <CardHeader
                    title={plan.name}
                    subheader={`$${plan.price}`}
                    sx={{ backgroundColor: selectedPlan === plan.id ? colors.blueAccent[500] : 'initial', color: 'white' }}
                  />
                  <CardContent>
                    <ul>
                      {plan.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
                    <Button
                      variant={selectedPlan === plan.id ? 'contained' : 'outlined'}
                      color="secondary"
                      onClick={() => handlePlanSelect(plan.id)}
                    >
                      {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

    </Box>
  );
};

export default SubscriptionPlans;
