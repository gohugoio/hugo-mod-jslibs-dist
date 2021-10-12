import { evaluateLater } from '../evaluator'
import { elementBoundEffect } from '../reactivity'
import { magic } from '../magics'
import { onAttributeRemoved } from '../mutation'

magic('watch', el => (key, callback) => {
    let evaluate = evaluateLater(el, key)

    let firstTime = true

    let oldValue

    let [effect, cleanupEffect] = elementBoundEffect(el)

    // MemLeak1: Issue #2140
    onAttributeRemoved(el, key, cleanupEffect)

    effect(() => evaluate(value => {
        // This is a hack to force deep reactivity for things like "items.push()".
        let div = document.createElement('div')
        div.dataset.throwAway = value

        if (! firstTime) {
            // We have to queue this watcher as a microtask so that
            // the watcher doesn't pick up its own dependencies.
            queueMicrotask(() => {
                callback(value, oldValue)

                oldValue = value
            })
        } else {
            oldValue = value
        }

        firstTime = false
    }))
})
