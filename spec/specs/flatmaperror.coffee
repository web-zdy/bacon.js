describe "EventStream.flatMapError", ->
  describe "allows spawning a new stream from an error", ->
    expectStreamEvents(
      ->
        source = fromArraySync [
          error()
          error(value: true, data: 1)
          error()
          error(value: true, data: 2)
        ]
        source.flatMapError (err) ->
          if err?.value
            Bacon.immediately(err.data)
          else
            error()

      [error(), 1, error(), 2]
    )
  describe "passes value events through", ->
    expectStreamEvents(
      -> fromArraySync([1, 2]).flatMapError(-> Bacon.once("omg"))
      [1, 2])
  it "toString", ->
    expect(Bacon.once(1).flatMapError(->).toString()).to.equal("Bacon.once(1).flatMapError(function)")

