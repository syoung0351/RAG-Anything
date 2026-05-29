# ROI Calculation Methods for Software Projects

## Simple ROI

```
ROI = (Net Benefit / Total Cost) × 100%
Net Benefit = Total Benefit - Total Cost
```

## Payback Period

```
Payback Period = Total Investment / Annual Net Benefit
```

Rule of thumb: CFOs typically want payback within 2–3 years for software investments.

## Net Present Value (NPV)

```
NPV = Σ [Cash Flow_t / (1 + r)^t] - Initial Investment

where:
  t = time period (year 1, 2, 3...)
  r = discount rate (typically WACC or hurdle rate, often 8–15% for software)
```

**Decision rule:** NPV > 0 → investment creates value. NPV < 0 → destroys value at this discount rate.

**Example:** $500K investment, $600K/year net benefit for 3 years, 10% discount rate.
```
NPV = [600K/1.1] + [600K/1.21] + [600K/1.331] - 500K
    = 545K + 496K + 451K - 500K
    = +$992K
```

## Internal Rate of Return (IRR)

The discount rate at which NPV = 0. If IRR > your cost of capital, the investment is justified.

Calculate with Excel’s `=IRR()` or Python’s `numpy_financial.irr()`.

## Quantifying Intangible Benefits

| Benefit | Quantification method |
|---|---|
| Faster time to market | Revenue per month of earlier launch × acceleration |
| Reduced churn | Churn rate reduction × average customer lifetime value |
| Developer productivity | Hours saved/week × engineers × loaded hourly rate |
| Risk reduction | Probability of incident × expected cost of incident |
| Regulatory compliance | Cost of non-compliance × probability |

## Avoided Cost Analysis

```
Avoided Cost = P(failure without investment) × Cost(failure)
             - P(failure with investment) × Cost(failure)
             - Investment cost
```

**Example:** 40% breach probability, $2M breach cost, $200K security investment reducing probability to 5%.
```
Avoided = (0.40 × $2M) - (0.05 × $2M) - $200K = $500K expected value
```
