import { render, screen} from "@testing-library/react"
import TodoList from "../components/TodoList"
import userEvent from "@testing-library/user-event"

describe("Testando o TodoList", () => {

    test("Deve renderizar com o título", () => {

        render(<TodoList/>)

        const title = screen.getByText(/Todo List/i)
        screen.debug()
        expect(title).toBeInTheDocument()
    })

    test("O input deve inciar vazio", () => {

        render(<TodoList/>)

        const input = screen.getByPlaceholderText("Enter a todo")

        screen.debug()

        expect(input).toHaveValue("")
    })

    test("Deve atualizar o valor do input quando digitar nele", async () => {

        const user = userEvent.setup()

        render(<TodoList/>)

        const input = screen.getByPlaceholderText("Enter a todo")

        await user.type(input, "teste de digitação")

        screen.debug()

        expect(input).toHaveValue("teste de digitação")
    })

    test("Deve renderizar uma nova tarefa ao digitar no input e prssionar a tecla enter", async () => {

        const user = userEvent.setup()

        render(<TodoList/>)

        const input = screen.getByPlaceholderText("Enter a todo")

        await user.type(input, "nova tarefa{enter}")

        const result = screen.getByText("nova tarefa")

        screen.logTestingPlaygroundURL()
        
        expect(result).toBeInTheDocument("nova tarefa")
    })

    test("Deve alterar o status da tarefa quando o botão de alterar status for clicado", async () => {

        const user = userEvent.setup()

        render(<TodoList/>)

        const input = screen.getByPlaceholderText("Enter a todo")

        await user.type(input, "nova tarefa{enter}")

        const result = screen.getByText("nova tarefa")

        const buttonToggle = screen.getByRole('button', { name: /toggle/i})

        await user.click(buttonToggle)

        screen.logTestingPlaygroundURL()

        expect(result).toHaveStyle('text-decoration: line-through')
    })

    test("Deve remover a tarefa quando o botão de deletar for clicado", async () => {

        const user = userEvent.setup()

        render(<TodoList/>)

        const input = screen.getByPlaceholderText("Enter a todo")

        await user.type(input, "nova tarefa{enter}")

        const result = screen.getByText("nova tarefa")

        const buttonDelete = screen.getByRole('button', {name: /delete/i})

        await user.click(buttonDelete)

        screen.logTestingPlaygroundURL()

        expect(result).not.toBeInTheDocument()
    })

})