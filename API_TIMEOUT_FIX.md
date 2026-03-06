# API Timeout Fix

Based on the error logs provided:
```
[Stream] Error in process_stream: timed out
Traceback (most recent call last):
...
TimeoutError: timed out
```

The issue is caused by the connection or read operation timing out after approximately 60 seconds (the default timeout).

## Changes Made

1.  **Increased Timeout**: The timeout for API requests in `cherrystudio/api/cherry_studio_api.py` has been increased from **60 seconds** to **300 seconds** (5 minutes). This applies to both proxied and non-proxied requests.
2.  **Error Logging**: Added try-except blocks around the response reading loop to log specific timeout errors with the elapsed time.

This should prevent the `TimeoutError` when the LLM service takes longer than 60 seconds to respond or when the network is slow.

## File Modified
- `cherrystudio/api/cherry_studio_api.py`
