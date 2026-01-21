import { intro, spinner } from '@clack/prompts'
import { createMain, defineCommand } from 'citty'
import { ofetch } from 'ofetch'
import pc from 'picocolors'
import { description, name, version } from '../package.json'

const main = defineCommand({
    meta: {
        name,
        version,
        description,
    },
    args: {
        name: {
            type: 'positional',
            description: 'Your organization name',
            required: true,
        },
    },
    async run({ args }) {
        intro(pc.inverse(' Create Github Organization '))

        const name = args.name
        const s = spinner()
        s.start('Organization name checking...')

        try {
            await ofetch(`https://ungh.cc/users/${name}`)
            s.stop(`Error. Currently registered: ${pc.red(name)}`, 200)
        }
        catch (e) {
            s.stop(`Done. you can create this organization name: ${pc.green(name)}`)
        }
    },
})

createMain(main)()
