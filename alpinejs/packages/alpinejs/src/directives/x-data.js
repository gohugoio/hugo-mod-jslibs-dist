import { directive, prefix } from '../directives'
import { initInterceptors } from '../interceptor'
import { injectDataProviders } from '../datas'
import { addRootSelector } from '../lifecycle'
import { shouldSkipRegisteringDataDuringClone } from '../clone'
import { addScopeToNode } from '../scope'
import { injectMagics, magic } from '../magics'
import { reactive } from '../reactivity'
import { evaluate } from '../evaluator'

addRootSelector(() => `[${prefix('data')}]`)

directive('data', ((el, { expression }, { cleanup }) => {
    if (shouldSkipRegisteringDataDuringClone(el)) return

    expression = expression === '' ? '{}' : expression

    let magicContext = {}
    let cleanup1 = injectMagics(magicContext, el).cleanup

    let dataProviderContext = {}
    injectDataProviders(dataProviderContext, magicContext)

    let data = evaluate(el, expression, { scope: dataProviderContext })

    if (data === undefined || data === true) data = {}

    let cleanup2 = injectMagics(data, el).cleanup

    let reactiveData = reactive(data)

    initInterceptors(reactiveData)

    let undo = addScopeToNode(el, reactiveData)

    reactiveData['init'] && evaluate(el, reactiveData['init'])

    cleanup(() => {
        reactiveData['destroy'] && evaluate(el, reactiveData['destroy'])

        undo()

         // MemLeak1: Issue #2140
         cleanup1()
         cleanup2()
    })
}))
