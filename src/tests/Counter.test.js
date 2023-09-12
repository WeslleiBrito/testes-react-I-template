import { render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Counter from "../components/Counter"


describe("Teste do Counter", () => {

    test("Deve aumentar em 3 o contador quando o botão de incremento for clicado 3 vezes", async () => {
        const user = userEvent.setup()
        render(<Counter/>)

        screen.logTestingPlaygroundURL()

        const increment = screen.getByRole('button', {name: /\+/i})

        const textBoxCounter = screen.getByText(/0/i)
        expect(textBoxCounter).toBeInTheDocument()
    
        await user.click(increment)
        await user.click(increment)
        await user.click(increment)

        const textUpdate = screen.getByText(/3/i)

        expect(textUpdate).toBeInTheDocument()
        
    })
})