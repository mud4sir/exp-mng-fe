
import { Table, Group, Button, Text, Avatar } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

import { Expense, TableComponentProps } from '../interfaces';
import { tableStyles } from '../styles';

function TableComponent({ expenses, handleStatusChange }: TableComponentProps) {
  const { classes } = tableStyles();

  const rows = expenses.length && expenses.map((expense: Expense) => (
    <tr key={expense.id}>
      <td>
        <Avatar
          radius="50%"
          src={expense.picture}
          alt="it's me"
          size='md'
        />
      </td>
      <td>{expense.name}</td>
      <td className='email'>{expense.amount}</td>
      <td>
        {
          expense.status !== 'pending'
            ? <Text className={classes[expense.status]}>{expense.status}</Text>
            : <>
              {
                handleStatusChange
                  ? (
                    <Group spacing="sm">
                      <Button onClick={() => { handleStatusChange(expense.id, 'rejected') }} variant="light" color="red" radius="xs">
                        <IconX />
                      </Button>
                      <Button onClick={() => { handleStatusChange(expense.id, 'approved') }} variant="light" color="teal" radius="xs">
                        <IconCheck />
                      </Button>
                    </Group>
                  )
                  :
                  <Text c="#F29339">{expense.status}</Text>
                }
              </>
        }
      </td>
    </tr>
  ));

  return (
    <Table verticalSpacing="xs" className={classes.tableWrapper} withBorder>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        { rows || <tr><td colSpan={4} align='center'>No records available.</td></tr> }
        </tbody>
    </Table>
  );
}

export default TableComponent;
