# compiler-node

Currently, the Gren compiler consist of two parts: One part written in Gren which communicates with the
other part written in Haskell.

This is a temporary migration strategy. In the future, the compiler will only contain Gren code.

The goal of this package is to make it easier to use the compiler to build language tools, or to
integrate the compiler in your own code.
