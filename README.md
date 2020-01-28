Select2 component which supports API (or service) calls.

# Installation
Add javascript into `index.html` (or `_Host.cshtml` for Server-Side)
```html
<script src="_content/NEvaldas.Blazor.Select2/select2.blazor.js"></script>
```
Then add using to `_Imports.razor`
```html
@using NEvaldas.Blazor.Select2
```

# Usage

If simple Select2 usage is needed:
```html
<Select2 TItem="string"
         Id="simple-string-example"
         Data="@SimpleStringList"
         @bind-Value="@ValueSelected">
</Select2>
```
If you need to query service, use `GetPagedData` and call whatever you need. Query will contain search term, page number and page size for paging:
```html
<Select2 @ref="@ProvidedSelect2Ref" TItem="SomeInnerObject"
         Id="get-paged-data-inner-obj-example"
         GetPagedData="@(query => Task.FromResult(
                            InnerObjectList
                                .Where(x => string.IsNullOrWhiteSpace(query.Term) || x.InnerName.Contains(query.Term, StringComparison.OrdinalIgnoreCase))
                                .Skip((query.Page - 1) * query.Size)
                                .Take(query.Size)
                                .ToList()))"
         @bind-Value="@FakeObject.Inner"
         TextExpression="@(item => item.InnerName)"
         EditContext="@EditContext">
</Select2>
```

It also supports complex objects with validation.

See demo project for more examples.