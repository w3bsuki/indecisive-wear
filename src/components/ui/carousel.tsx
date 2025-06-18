"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft } from 'lucide-react'
import { ArrowRight } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        align: "start",
        containScroll: "trimSnaps",
        dragFree: false,
        dragThreshold: 10,
        skipSnaps: false,
        duration: 25, // Faster transitions
        startIndex: 0,
        inViewThreshold: 0.7,
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn(
            "relative w-full",
            "touch-manipulation",
            "transform-gpu",
            "will-change-transform",
            className
          )}
          role="region"
          aria-roledescription="carousel"
          style={{ 
            touchAction: 'pan-x pinch-zoom',
            WebkitOverflowScrolling: 'touch'
          }}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div 
      ref={carouselRef} 
      className={cn(
        "overflow-hidden",
        "scrollbar-hide",
        "w-full",
        "scroll-smooth-mobile"
      )}
      style={{
        touchAction: 'pan-x',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain'
      }}
    >
      <div
        ref={ref}
        className={cn(
          "flex",
          "touch-manipulation",
          "will-change-transform",
          "transform-gpu",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  // const { orientation } = useCarousel() // Unused for now

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0",
        "basis-full",
        "sm:basis-1/2 md:basis-1/3 lg:basis-1/4",
        "touch-manipulation",
        "transform-gpu",
        "will-change-transform",
        className
      )}
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden'
      }}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute z-10",
        "h-10 w-10 md:h-12 md:w-12",
        "rounded-full",
        orientation === "horizontal"
          ? cn(
              "left-2 md:left-4 top-1/2 -translate-y-1/2",
              "md:-left-6 lg:-left-12"
            )
          : cn(
              "top-2 md:top-4 left-1/2 -translate-x-1/2 rotate-90",
              "md:-top-6 lg:-top-12"
            ),
        "shadow-md hover:shadow-lg",
        "transition-all duration-200 ease-mobile",
        "active:scale-95",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute z-10",
        "h-10 w-10 md:h-12 md:w-12",
        "rounded-full",
        orientation === "horizontal"
          ? cn(
              "right-2 md:right-4 top-1/2 -translate-y-1/2",
              "md:-right-6 lg:-right-12"
            )
          : cn(
              "bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 rotate-90",
              "md:-bottom-6 lg:-bottom-12"
            ),
        "shadow-md hover:shadow-lg",
        "transition-all duration-200 ease-mobile",
        "active:scale-95",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

const CarouselDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { api } = useCarousel()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  React.useEffect(() => {
    if (!api) return

    setScrollSnaps(api.scrollSnapList())
    setSelectedIndex(api.selectedScrollSnap())

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  const scrollTo = React.useCallback(
    (index: number) => api?.scrollTo(index),
    [api]
  )

  if (scrollSnaps.length <= 1) return null

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-2 mt-4 md:mt-6",
        className
      )}
      role="tablist"
      aria-label="Carousel navigation"
      {...props}
    >
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-label={`Go to slide ${index + 1}`}
          className={cn(
            "h-2 w-2 md:h-2.5 md:w-2.5 rounded-full",
            "p-1 -m-1",
            "transition-all duration-200 ease-mobile",
            index === selectedIndex
              ? "bg-primary scale-110"
              : "bg-primary/30 hover:bg-primary/50",
            "active:scale-90",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          onClick={() => scrollTo(index)}
        />
      ))}
    </div>
  )
})
CarouselDots.displayName = "CarouselDots"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
}
