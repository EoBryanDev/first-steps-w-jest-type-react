import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import List from './List';

describe('List Component', () => {

    it('should render list items', () => {
        const { getByText } = render(<List initialItems={['Diego','Rodz', 'Mayk']}/>);

        expect(getByText('Diego')).toBeInTheDocument();
        expect(getByText('Rodz')).toBeInTheDocument();
        expect(getByText('Mayk')).toBeInTheDocument();
      
    });

    it('should be able to add new item to the list', async () => {
        const { getByText, getByPlaceholderText} = render(<List initialItems={[]}/>);

        const addButton = getByText('Adicionar');
        const inputElement = getByPlaceholderText('novo item');

        await userEvent.type(inputElement, 'Novo')
        await userEvent.click(addButton);


        expect(getByText('Novo')).toBeInTheDocument();

    });

    it('should be able to add new item to the list after 500ms', async () => {
        const { getByText, getByPlaceholderText, findByText} = render(<List initialItems={[]}/>);

        const addButton = getByText('Adicionar2');
        const inputElement = getByPlaceholderText('novo item');

        await userEvent.type(inputElement, 'Novo')
        await userEvent.click(addButton);

        await waitFor(() => {

            expect(getByText('Novo')).toBeInTheDocument();

        })
        //expect(await findByText('Novo')).toBeInTheDocument();


    });
    it('should be able to remove new item to the list after 500ms', async () => {
        const { getByText, getAllByText, queryByText} = render(<List initialItems={['Diego']}/>);

        const addButton = getByText('Adicionar');
        const removeButtons = getAllByText('Remover');

        await userEvent.click(removeButtons[0]);

        await waitForElementToBeRemoved(() => {

            return getByText('Diego');

        })

        await waitFor(() => {

            expect(queryByText('Diego')).not.toBeInTheDocument();

        })
        //expect(await findByText('Novo')).toBeInTheDocument();


    });
})