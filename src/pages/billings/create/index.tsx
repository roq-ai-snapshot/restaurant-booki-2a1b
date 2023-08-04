import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createBillings } from 'apiSdk/billings';
import { billingsValidationSchema } from 'validationSchema/billings';
import { BillingsInterface } from 'interfaces/billings';

function BillingsCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: BillingsInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createBillings(values);
      resetForm();
      router.push('/billings');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<BillingsInterface>({
    initialValues: {
      order_summary: '',
      total_value: 0,
      table_number: '',
    },
    validationSchema: billingsValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Billings',
              link: '/billings',
            },
            {
              label: 'Create Billings',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Billings
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.order_summary}
            label={'Order Summary'}
            props={{
              name: 'order_summary',
              placeholder: 'Order Summary',
              value: formik.values?.order_summary,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Total Value"
            formControlProps={{
              id: 'total_value',
              isInvalid: !!formik.errors?.total_value,
            }}
            name="total_value"
            error={formik.errors?.total_value}
            value={formik.values?.total_value}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_value', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.table_number}
            label={'Table Number'}
            props={{
              name: 'table_number',
              placeholder: 'Table Number',
              value: formik.values?.table_number,
              onChange: formik.handleChange,
            }}
          />

          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/billings')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'billings',
    operation: AccessOperationEnum.CREATE,
  }),
)(BillingsCreatePage);
